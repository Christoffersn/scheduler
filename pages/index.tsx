import Router from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
  Row,
  Col,
  Form,
  Container,
  Jumbotron,
  Button,
  Spinner,
} from "react-bootstrap";
import { nanoid } from "nanoid";
import { useState } from "react";
import Layout from "../src/components/Layout";
import { encrypt } from "../src/helpers";
import ResponseMessage from "../src/components/ResponseMessage";
import { Time, Poll } from "../src/models/poll";
import { createPoll } from "../src/utils/api/server";

// typings aren't available for react-available-times

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AvailableTimes: any = dynamic(() => import("react-available-times"), {
  ssr: false,
});

const Home = (): JSX.Element => {
  const [pollDetails, setPollDetails] = useState<{
    pollTitle: string;
    pollLocation: string;
    pollDescription: string;
  }>({
    pollTitle: "",
    pollLocation: "",
    pollDescription: "",
  });

  const { pollTitle, pollLocation, pollDescription } = pollDetails;

  const [pollTimes, setTimes] = useState<Time[]>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const [response, setResponse] = useState({
    status: false,
    msg: "",
  });

  const handlePollDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;

    setPollDetails({
      ...pollDetails,
      [name]: value,
    });
  };

  const onTimesChange = (selections: { start: Date; end: Date }[]): void => {
    const newTimes: Time[] = selections.map(
      (time): Time => ({
        start: time.start.getTime(),
        end: time.end.getTime(),
      })
    );
    setTimes(newTimes);
  };

  const areTimesValid = (times: Time[] | undefined): boolean => {
    if (!times) return false;
    if (times.some((time: Time) => time.start < Date.now())) return false;
    return true;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!pollTimes || (pollTimes && pollTimes?.length === 0)) {
      setResponse({
        status: true,
        msg: "Please select at least one time slot for invitees.",
      });
      return;
    }
    if (!areTimesValid(pollTimes)) {
      setResponse({
        status: true,
        msg: "Chosen time slots must not be in the past.",
      });
      return;
    }

    const secret = nanoid(10);

    const poll: Poll = {
      title: pollTitle,
      description: pollDescription,
      location: pollLocation,
      secret: encrypt(secret),
      times: pollTimes,
    };

    try {
      setDisabled(true);

      const createPollResponse = await createPoll({
        poll,
      });

      if (createPollResponse.statusCode === 201) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            `${createPollResponse.data._id}-${pollTitle}`,
            "creator"
          );
        }
        Router.push(`/poll/${createPollResponse.data._id}/${secret}`);
      } else {
        setDisabled(false);
        setResponse({
          status: true,
          msg: "Poll creation failed, please try again later.",
        });
      }
    } catch (err) {
      setDisabled(false);
      setResponse({
        status: true,
        msg: "Poll creation failed, please try again later.",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Kukkee | Fast meeting polls</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="4g7sVHEgHkqmu_q066ocloQj3YI8pOz7IHC8ibisQHk"
        />
        <meta name="title" content="Kukkee | Fast meeting polls" />
        <meta
          name="description"
          content="Bring people together at the right time with Kukkee — the free and open source tool for fast meeting polls."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kukkee.com" />
        <meta property="og:title" content="Kukkee | Fast meeting polls" />
        <meta
          property="og:description"
          content="Bring people together at the right time with Kukkee — the free and open source tool for fast meeting polls."
        />
        <meta property="og:image" content="/banner.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kukkee.com" />
        <meta property="twitter:title" content="Kukkee | Fast meeting polls" />
        <meta
          property="twitter:description"
          content="Bring people together at the right time with Kukkee — the free and open source tool for fast meeting polls."
        />
        <meta property="twitter:image" content="/banner.png" />
      </Head>
      <Layout>
        <div className="global-page-section">
          <Container className="global-container">
            <Jumbotron className="new-poll-timeslot-jumbo">
              <AvailableTimes
                weekStartsOn="monday"
                onChange={onTimesChange}
                height="42rem"
              />
            </Jumbotron>
            <Jumbotron className="new-poll-jumbo">
              <Row>
                <Col sm>
                  <Form.Control
                    className="form-text"
                    type="text"
                    placeholder="Title (optional)"
                    name="pollTitle"
                    onChange={handlePollDetailsChange}
                  />
                </Col>
                <Col sm>
                  <Form.Control
                    className="form-text"
                    type="text"
                    name="pollDescription"
                    placeholder="Description (optional)"
                    onChange={handlePollDetailsChange}
                  />
                </Col>
                <Col sm>
                  <Form.Control
                    className="form-text"
                    type="text"
                    name="pollLocation"
                    placeholder="Location (optional)"
                    onChange={handlePollDetailsChange}
                  />
                </Col>
                <Col sm="auto">
                  <Button
                    className="global-primary-button"
                    onClick={handleSubmit}
                    disabled={disabled}
                  >
                    {!disabled ? (
                      `Create`
                    ) : (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="form-button-spinner"
                        />
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
            </Jumbotron>
            <ResponseMessage response={response} setResponse={setResponse} />
          </Container>
        </div>
      </Layout>
    </>
  );
};

export default Home;
