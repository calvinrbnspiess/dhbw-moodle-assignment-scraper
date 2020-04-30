# dhbw-moodle-assignment-scraper

This is a small experiment that can be used to display assignments on the [DHBW Mosbach Moodle](https://moodle.mosbach.dhbw.de/login/index.php). Console output looks like this:

	┌─────────┬──────────────┬──────────────────────────────────────────────────────────────────────────────────┬───────────────────────┐
	│ (index) │     Kurs     │                                   Beschreibung                                   │       Fällig am       │
	├─────────┼──────────────┼──────────────────────────────────────────────────────────────────────────────────┼───────────────────────┤
	│    0    │ 'ONXX:XX:XX' │ 'Schritt 2: Abgabe von Präsentation(en) und XXXXXXXXX XXXXXXXXXX XX ist fällig.' │ '6.5.2020, 09:00:00'  │
	│    1    │ 'ONXX:XX:XX' │     'Schritt 4: Peer-XXXXXXXX/XXXXXXXXXXX (Abgabetermin für XXXX XXXXXXXX)'      │ '6.5.2020, 21:06:00'  │
	│    2    │  'ONXX:TX'   │                'Abgabe XXXXXXXX XXXXXXXX XXXXXX XXXX ist fällig.'                │ '14.6.2020, 23:59:00' │
	│    3    │  'ONXX:XX'   │           'Abgabe Assignment X - XXXX-Interface mit XX/XX ist fällig.'           │ '16.6.2020, 00:00:00' │
	│    4    │ 'ONXX:XX:XX' │      'Schritt 4: Peer-XXXX XXX/Bewertungen Abgabetermin der Beurteilungen'       │ '17.7.2020, 21:00:00' │
	│    5    │  'ONXX:XX'   │                        'Abgabe des XX XXXXX ist fällig.'                         │ '24.7.2020, 00:00:00' │
	└─────────┴──────────────┴──────────────────────────────────────────────────────────────────────────────────┴───────────────────────┘

Feel free to use.

## How to use

Install dependencies with `npm install`.

Create a `.env` and fill it will these two environment variables:

- `MOODLE_USERNAME=[your moodle username]`
- `MOODLE_PW=[your moodle password`

Then run `npm run start`
