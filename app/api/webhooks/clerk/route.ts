import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { userCreate } from "@/utils/functions/user/userCreate";
import { userUpdate } from "@/utils/functions/user/userUpdate";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  console.log('Payload received:', payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Handle the event
  const { id } = evt.data;
  const eventType = evt.type;

  switch (eventType) {
    case "user.created":
      try {
        await userCreate({
          email: evt.data.email_addresses[0]?.email_address,
          first_name: evt.data.first_name || undefined, 
          last_name: evt.data.last_name || undefined,
          profile_image_url: evt.data.image_url || undefined, 
          user_id: evt.data.id, 
        });

        return NextResponse.json({
          status: 200,
          message: "User info inserted",
        });
      } catch (error: any) {
        return NextResponse.json({
          status: 400,
          message: error.message,
        });
      }

    case "user.updated":
      try {
        await userUpdate({
          email: evt.data.email_addresses[0]?.email_address,
          first_name: evt.data.first_name || undefined, 
          last_name: evt.data.last_name || undefined,   
          profile_image_url: evt.data.image_url || undefined,
          user_id: evt.data.id,
        });

        return NextResponse.json({
          status: 200,
          message: "User info updated",
        });
      } catch (error: any) {
        return NextResponse.json({
          status: 400,
          message: error.message,
        });
      }

    default:
      return new Response("Error occured -- unhandled event type", {
        status: 400,
      });
  }

  return new Response('', { status: 200 });
}
