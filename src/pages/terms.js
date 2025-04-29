import React from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';

const TermsAndPolicies = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '2rem' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Terms and Policies
      </Typography>

      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        gutterBottom
      >
        Welcome to Fitness for Life! Please read the following terms carefully
        before using our website.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Accordion>
          <AccordionSummary>
            <Typography variant="h6">1. General Terms of Use</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              By accessing or using the Fitness for Life website, you agree to
              comply with our terms. Users must be 18 years or older or have
              parental consent. We reserve the right to update these terms
              periodically.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <Typography variant="h6">2. User Responsibilities</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Users are responsible for maintaining the confidentiality of
              account credentials and must avoid engaging in prohibited
              activities, including illegal actions or posting misleading
              content.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <Typography variant="h6">3. Privacy Policy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We collect personal data to enhance your experience. Your data
              will not be sold but may be shared with trusted partners to
              provide services. By using our site, you agree to our cookie
              policy.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <Typography variant="h6">4. Disclaimer</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              All content is for informational purposes only and is not
              professional medical advice. Consult a healthcare provider before
              starting any fitness program.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <Typography variant="h6">
              5. Refund and Cancellation Policy
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Digital products are non-refundable unless stated otherwise.
              Subscription cancellations will take effect at the end of the
              current billing cycle.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <Typography variant="h6">6. Contact Us</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              For questions, reach out to us at:
              <br />
              Email: support@fitnessforlife.com
              <br />
              Phone: [Insert Phone Number]
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default TermsAndPolicies;
