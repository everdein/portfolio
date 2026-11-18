# Resume publishing

The resume page uses the shared app theme. Its professional text comes from the
approved Google Docs resume; the web header uses the requested LinkedIn headline.
The web portrait is the same original image used on the portfolio homepage.

Three native Google Docs PDF exports are published:

- `public/matthew-clark-resume.pdf`: white paper, dark text, readable accents.
- `public/matthew-clark-resume-dark.pdf`: Dark Modern charcoal and exact syntax colors.
- `public/matthew-clark-resume-regular.pdf`: dark text and blue accents on white.

| Role | Dark PDF | Light PDF |
| --- | --- | --- |
| Background | #1F1F1F | #FFFFFF |
| Body | #CCCCCC | #101412 |
| Links / blue accent | #9CDCFE | #193EA1 |
| Magenta accent | #C586C0 | #193EA1 |
| Yellow accent | #DCDCAA | #193EA1 |
| Salmon accent | #CE9178 | #193EA1 |
| Rules | #454545 | #C2CCC7 |

The PDF content, typography, native links, margins, and two-page layout are
preserved from the source document. Apply colors without rewriting text or
flattening the native structure. Export each version, compare extracted text
with the source export, and render and inspect every page before replacing files.
The November 18, 2026 approved Dark, Light, and Regular documents are maintained
in the user-supplied Drive Resume folder. Each uses Calibri and a text header.
The initially empty Light document was populated using Regular's formatting;
both currently use white paper and blue accents. The approved content adds
Fabric ingestion, medallion architecture, and pipeline monitoring, omits PBK
source-system names, and identifies AI document review as ongoing. State Farm
accomplishments remain unchanged. `app/resume/content.json` mirrors this copy.

Each PDF has an explicit Download link and a View link. View links launch the
same exported PDF in a new tab, where the browser PDF viewer provides printing.
The Regular variant also has explicit Download and View actions.

Keep the stable light-PDF filename for existing links. Public resume navigation
and profile cards should link to `/resume/` so all three formats stay discoverable.
