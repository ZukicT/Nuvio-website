# Contact form and Discord delivery

The contact page accepts up to three PNG, JPEG, or WebP images, with a 5 MiB per-image and 8 MiB combined limit. Files must decode successfully and stay below 40 million pixels. Selection remains local until the user submits. Previews support removing each file. Object URLs are revoked on removal and reset.

The existing Discord webhook receives a multipart request with `payload_json` and `files[n]`. Attachments receive generated filenames. The first embed contains the topic, complete message, sender, reply email, device, site language, image count, timestamp, and a reference ID. Topic colors distinguish bug reports, suggestions, and business inquiries. Each image receives an embedded preview. User markdown is escaped, mentions are disabled, and user text is rendered with DOM text APIs rather than HTML.

The message limit is 2,000 characters, preserving the full message within Discord's embed limits after escaping. Sender and device inputs also have explicit length limits. Successful delivery requires `wait=true`, an OK response, and a returned message ID. The form clears only after confirmation. Network failures and rate limiting keep the current fields and images. Email fallback is an explicit user action; users must manually attach images to the email. Requests time out after 30 seconds, without automatic retries. A timeout can be ambiguous, so retry copy mentions possible duplicates.

The form uses the existing direct webhook architecture. Client checks do not establish server-side upload enforcement or abuse protection. A server endpoint would be needed to hide the webhook and enforce those controls independently of the browser. No new dependencies or hosting service were added.

## Validation

Run `node tools/test-contact-form.cjs` from the website root. Tests simulate responses and do not post to Discord. They cover text-only and image payloads, a maximum-length message, mention suppression, upload type/size/count/total-size checks, corrupt images, success reset, failures retaining images, email fallback, duplicate submit prevention, required fields, and custom-device changes.

Browser checks covered actual image selection, previews, removal, unsupported files, required-field validation, and a live three-image submission. Discord confirmed the labeled QA submission with reference `NV-F95EDC04` on October 18, 2026. It used `qa@example.com` and public Nuvio icons. No user screenshot or private financial information was uploaded. Mobile layout was checked at 320 and 390 pixels. Live rate-limit and failure responses were simulated locally to avoid sending extra support messages.

Implementation references: [Discord webhooks](https://docs.discord.com/developers/resources/webhook#execute-webhook), [Discord file uploads](https://docs.discord.com/developers/reference#uploading-files), [OWASP file upload guidance](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html).
