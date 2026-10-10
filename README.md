# A Little World for You 💙
Plain HTML/CSS/JS, no build step.
Run: open index.html in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000
Edit text: open any .html file and change the words. Replace [Your name] and [her name] in appreciation.html and letter.html.
Photos: put images in images/, then edit js/photos.js (src, category, caption, date). Delete all entries to see the empty state.
Colors: change the variables at the top of css/style.css.

## Getting her answer (GitHub Pages)
GitHub Pages is static, so it can't store replies itself. This uses Web3Forms (free):
1. Go to web3forms.com, enter your email, and copy the access key they send you.
2. Paste it into js/config.js: const WEB3FORMS_KEY = "your-key";
3. Upload to GitHub, then Settings > Pages > deploy from main branch.
4. When she clicks either button, you get an email with her choice and the time.
Test it yourself first. Her page says the answer is sent to you, so she knows.


## October 10 proposal + Spotify playlist
- The homepage now opens with the cursive-style `10/10` date and a Spotify playlist embed.
- Her YES response is saved in that browser's local storage. This is only visible on the same browser/device.
- To receive the response on your own device after publishing to GitHub Pages, create a free key at https://web3forms.com and paste it into `js/config.js` as `const WEB3FORMS_KEY = "your-key";`. Web3Forms will email the answer to the address attached to that key. GitHub Pages alone cannot save shared responses for all visitors.
- The playful NO button dodges the cursor/tap; she can choose YES to reveal the celebration. Keep the question lighthearted and let her answer honestly.
