import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { supabase } from "@/lib/supabase";

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
  options: { timeout: 5000 }
});

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    // 1. Buscar dados do presente no Supabase
    const { data: present, error } = await supabase
      .from("presents")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !present) {
      return NextResponse.json({ error: "Presente não encontrado." }, { status: 404 });
    }

    // 2. Criar Pagamento PIX no Mercado Pago
    const payment = new Payment(client);
    
    // O Mercado Pago exige um e-mail do pagador para o PIX
    const paymentData = {
      body: {
        transaction_amount: 47.00,
        description: `MyLove - Presente de ${present.name1} para ${present.name2}`,
        payment_method_id: "pix",
        payer: {
          email: present.email,
        },
        // Notificação para o nosso webhook
        notification_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mylove.com'}/api/webhooks/mercadopago`,
        metadata: {
          present_id: id
        }
      }
    };

    const response = await payment.create(paymentData);

    // 3. Retornar os dados do PIX (QR Code e Chave)
    return NextResponse.json({
      qr_code: response.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: response.point_of_interaction?.transaction_data?.qr_code_base64,
      payment_id: response.id
    });

  } catch (error: any) {
    console.error("Mercado Pago Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
