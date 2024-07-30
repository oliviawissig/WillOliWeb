import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  console.log("SEARCH PARAMS", searchParams);

  const dbResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${body.userId}`,
    {
      cache: "no-store",
    }
  );
  const tempUser = await dbResponse.json();
  if (!tempUser) return NextResponse.json("User not found!", { status: 404 });

  if (searchParams.get("username")) {
    console.log("USERNAME FOUND");
    const response = await fetch(
      `https://www.spot.im/api/sso/v1/update-user?primary_key=${
        tempUser.id
      }&display_name=${tempUser.display_name}&user_name=${searchParams.get(
        "username"
      )}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          accept: "application/json",
          'x-spotim-sso-access-token': `${process.env.NEXT_PUBLIC_OPENWEB_SSO_TOKEN}`,
          "content-type": "application/json",
        },
      }
    );
  } else if (searchParams.get("email")) {
    console.log("EMAIL FOUND");
    const response = await fetch(
      `https://www.spot.im/api/sso/v1/update-user?primary_key=${
        tempUser.id
      }&user_name=${tempUser.username}&email=${searchParams.get("email")}&email_verified=true`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          accept: "application/json",
          'x-spotim-sso-access-token': `${process.env.NEXT_PUBLIC_OPENWEB_SSO_TOKEN}`,
          "content-type": "application/json",
        },
      }
    );
  } else if (searchParams.get("image_url")) {
    console.log("IMAGE URL FOUND");
    const response = await fetch(
      `https://www.spot.im/api/sso/v1/update-user?primary_key=${
        tempUser.id
      }&user_name=${tempUser.username}&image_url=${searchParams.get(
        "image_url"
      )}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          accept: "application/json",
          'x-spotim-sso-access-token': `${process.env.NEXT_PUBLIC_OPENWEB_SSO_TOKEN}`,
          "content-type": "application/json",
        },
      }
    );
  } else if (searchParams.get("display_name")) {
    console.log("DISPLAY NAME FOUND");
    const response = await fetch(
      `https://www.spot.im/api/sso/v1/update-user?primary_key=${
        tempUser.id
      }&user_name=${tempUser.username}&display_name=${searchParams.get(
        "display_name"
      )}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          'x-spotim-sso-access-token': `${process.env.NEXT_PUBLIC_OPENWEB_SSO_TOKEN}`,
          "content-type": "application/json",
        },
        cache: "no-store",
      }
    );
  }

  return NextResponse.json("");
}
