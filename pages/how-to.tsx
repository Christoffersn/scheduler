import Head from "next/head";
import Link from "next/link";
import { Button, Card, CardGroup, Container } from "react-bootstrap";
import { CheckCircleFill, CircleFill } from "react-bootstrap-icons";
import Layout from "../src/components/Layout";

const HowTo = (): JSX.Element => {
  if (typeof window !== "undefined") {
    localStorage.setItem("samayNewVisitor", JSON.stringify(false));
  }

  return (
    <>
      <Head>
        <title>Scheduler — how-to</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="title"
          content="Samay — find a time which works for everyone"
        />
        <meta
          name="description"
          content="Here's how to get started with Samay - a free and open source group scheduling tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samay.app" />
        <meta
          property="og:title"
          content="Samay — find a time which works for everyone"
        />
        <meta
          property="og:description"
          content="Here's how to get started with Samay - a free and open source group scheduling tool."
        />
        <meta property="og:image" content="https://samay.app/banner.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://samay.app" />
        <meta
          property="twitter:title"
          content="Samay — find a time which works for everyone"
        />
        <meta
          property="twitter:description"
          content="Here's how to get started with Samay - a free and open source group scheduling tool."
        />
        <meta property="twitter:image" content="https://samay.app/banner.png" />
      </Head>
      <Layout>
        <Container className="how-to-container">
          <span className="how-to-features title">
            Samay — free and open source group scheduling tool
          </span>
          <span className="how-to-features desc">
            Find a time which works for everyone without the back-and-forth
            texts/emails!
          </span>
          <CardGroup className="how-to-card-group">
            <Card className="how-to-card">
              <Card.Body>
                <Card.Title className="how-to-card title">
                  1. Create a poll
                </Card.Title>
                <Card.Text className="how-to-card desc">
                  Select times you're free (click and drag), and optionally
                  enter the title, description and location. No login required.
                  <br />
                  <br />
                  The default poll type is "group" — to find a common time which
                  works for everyone. If you want to have one-on-one meetings
                  (parent-teacher meetings for example), select the "one-on-one"
                  poll type.
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
          <CardGroup className="how-to-card-group">
            <Card className="how-to-card">
              <Card.Body>
                <Card.Title className="how-to-card title">
                  2. Share the poll
                </Card.Title>
                <Card.Text className="how-to-card desc">
                  Copy and share the poll link with the participants to let them
                  mark their availability. No time zone confusion since Samay
                  automatically shows participants times in their local time
                  zone.
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
          <CardGroup className="how-to-card-group">
            <Card className="how-to-card">
              <Card.Body>
                <Card.Title className="how-to-card title">
                  3. Book the meeting
                </Card.Title>
                <Card.Text className="how-to-card desc">
                  In group polls, find the most popular times and see who's free
                  with "yes" [
                  <CheckCircleFill className="how-to-card icon-yes" />] votes or
                  who can be with "if need be" [
                  <CircleFill className="how-to-card icon-if-need-be" />] votes,
                  book the meeting and share the final time with the
                  participants! In one-on-one polls, find who has chosen which
                  time slot for a one-on-one with you!
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Container>
        <Container className="how-to-container cta">
          <Link href="/" passHref>
            <Button className="global-small-primary-btn">Create a poll</Button>
          </Link>
        </Container>
      </Layout>
    </>
  );
};

export default HowTo;
