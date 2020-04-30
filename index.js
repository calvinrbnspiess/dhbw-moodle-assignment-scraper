import dotenv from "dotenv";
import puppeteer from "puppeteer";

dotenv.config();

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.goto("https://www.intern.mosbach.dhbw.de/", {
    waitUntil: "networkidle2",
  });
  await page.type("#shortUsername", process.env.MOODLE_USERNAME);
  await page.type("#password", process.env.MOODLE_PW);

  const resolveWhenRedirected = page.waitForNavigation();

  await page.click(`#loginform input[type='submit']`);
  await resolveWhenRedirected;
  await page.goto("https://moodle.mosbach.dhbw.de/my/");

  // each session gets an unique id which is stored in a global javascript object
  const cfg = await page.evaluate(() => M.cfg);

  console.log("Session key is: ", cfg.sesskey, "\n");
  const response = await page.evaluate(
    async ({ sesskey }) => {
      const dateFrom = new Date();
      const dateTo = new Date();
      dateTo.setDate(dateTo.getDate() + 90);

      // fetch assignments for the next 90 days
      const response = await fetch(
        `https://moodle.mosbach.dhbw.de/lib/ajax/service.php?sesskey=${sesskey}&info=core_calendar_get_action_events_by_timesort`,
        {
          method: "POST",
          body: JSON.stringify([
            {
              index: 0,
              methodname: "core_calendar_get_action_events_by_timesort",
              args: {
                limitnum: 26,
                timesortfrom: Math.floor(dateFrom.getTime() / 1000),
                timesortto: Math.floor(dateTo.getTime() / 1000),
                limittononsuspendedevents: true,
              },
            },
          ]),
        }
      );
      return await response.json();
    },
    { sesskey: cfg.sesskey }
  );

  if (!response[0].error) {
    let assignments = [];
    for (let event of response[0].data.events) {
      assignments.push({
        Kurs: event.course.shortname,
        Beschreibung: event.name,
        "Fällig am": new Date(event.timestart * 1000).toLocaleString(),
      });
    }
    console.table(assignments);
  }

  await browser.close();
})();
