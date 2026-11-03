import { CLUB } from "@/data/club";

// Sends a form to the club inbox through Web3Forms (the access key is meant to be public).
export async function sendToClub(fields: Record<string, FormDataEntryValue | string>, subject: string): Promise<boolean> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: CLUB.formKey, subject, from_name: "AIBA website", replyto: fields.email, ...fields }),
    });
    const json = await res.json();
    return res.ok && json.success === true;
  } catch {
    return false;
  }
}
