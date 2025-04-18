import liff from "@line/liff";

// LIFF アプリとして最初に初期化する
export async function initializeLiff(
  liffId: string
): Promise<{ success: boolean; isInClient: boolean; error?: unknown }> {
  try {
    await liff.init({ liffId });
    console.log("LIFF initialization succeeded");
    // liff.isInClient() は、LIFFがLINEアプリ内で実行されているかどうかを示す
    // ブラウザで実行されている場合は false を返す
    // これを使って、LINEアプリ内での動作とブラウザでの動作を区別することができる
    const isInClient = liff.isInClient();
    return { success: true, isInClient };
  } catch (error) {
    console.error("LIFF initialization failed", error);
    return { success: false, isInClient: false, error }; // isInClient も false に設定
  }
}

export async function getLiffProfile() {
  if (!liff.isLoggedIn()) {
    return null;
  }

  try {
    const profile = await liff.getProfile();
    return profile;
  } catch (error) {
    console.error("Error getting LIFF profile", error);
    return null;
  }
}

export function getLiffToken() {
  if (!liff.isLoggedIn()) {
    return null;
  }

  try {
    const accessToken = liff.getAccessToken();
    return accessToken;
  } catch (error) {
    console.error("Error getting LIFF token", error);
    return null;
  }
}

export function closeLiff() {
  if (liff.isInClient()) {
    liff.closeWindow();
  }
}
