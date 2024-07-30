const handleBEDCallback = async (codeA: string, uid: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/start-handshake`,
    {
      method: "POST",
      body: JSON.stringify({
        // codeA that the callback gets and should be passed to OW's BED
        code_a: codeA,
        // We want to let the BED we want to login with a certain user - that is, the user we should do the BED handshake with OW.
        userId: uid,
      }),
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data.code_b;
};

export default handleBEDCallback;
