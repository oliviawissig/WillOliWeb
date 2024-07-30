import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const dbResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${body.userId}`,
    {
      cache: "no-store",
    }
  );
  const tempUser = await dbResponse.json();
  if (!tempUser) return NextResponse.json("User not found!", { status: 404 });
  const response = await fetch(
    `https://www.spot.im/api/sso/v1/register-user?code_a=${body.code_a}&access_token=${process.env.NEXT_PUBLIC_OPENWEB_SSO_TOKEN}&primary_key=${tempUser.id}&user_name=${tempUser.username}&image_url=${tempUser.image_url}&email=${tempUser.email}&email_verified=true&display_name=${tempUser.display_name}`,
    {
      cache: "no-store",
    }
  );
  const tempB = await response.text();
  if (!tempB)
    return NextResponse.json("Error with codeB, check OW logs", {
      status: 400,
    });

  return NextResponse.json({ code_b: tempB });
}
