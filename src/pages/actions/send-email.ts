import type { APIRoute } from "astro";
import { sendEmail } from "@/utils/email";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
    // Get the form data submitted by the user on the home page
    const formData = await request.formData();
    const to = formData.get("recipient") as string | null;
    const name = formData.get("name") as string | null;
    const phone = formData.get("phone") as string | null;
    const message = formData.get("message") as string | null;
    const language = formData.get("language") as "fr" | "en" | null;
    const subject =
        language === "fr"
            ? "Merci d'avoir contacté Clinique Idyllium"
            : "Thank you for contacting Idyllium Clinic";

    // Throw an error if we're missing any of the needed fields.
    if (!to || !subject || !message) {
        throw new Error("Missing required fields");
    }

    // Try to send the email using a `sendEmail` function we'll create next. Throw
    // an error if it fails.
    try {
        const html =
            language === "fr"
                ? `
            <div>
            <div>
                <h3>Nom:</h3>
                <code className="font-mono">${name}</code>
            </div>
            <div>
                <h3>Tel:</h3>
                <code className="font-mono">${phone}</code>
            </div>
            <div>
                <h3>Email:</h3>
                <code className="font-mono">${to}</code>
            </div>
            <div>
                <h3>Message:</h3>
                <code className="font-mono">${message}</code>
            </div>
            </div>
        `
                : `
            <div>
            <div>
                <h3>Name:</h3>
                <code className="font-mono">${name}</code>
            </div>
            <div>
                <h3>Phone:</h3>
                <code className="font-mono">${phone}</code>
            </div>
            <div>
                <h3>Email:</h3>
                <code className="font-mono">${to}</code>
            </div>
            <div>
                <h3>Message:</h3>
                <code className="font-mono">${message}</code>
            </div>
            </div>
        `;
        await sendEmail({ to, subject, html });
    } catch (error) {
        throw new Error("Failed to send email");
    }

    // Redirect the user to a success page after the email is sent.
    return redirect(language === "fr" ? "/merci" : "/en/thank-you");
};
