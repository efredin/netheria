import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'React';
import { Page } from './layout';
import { Instance, HardwareBuilder } from './hardware';
import { Formik, Form, FieldArray } from 'formik';

interface OctomizePayload {
  hardware: Instance[];
}

const initialValues: OctomizePayload = {
  hardware: []
};

const Octomize = () => {
  const [submitting, setSubmitting] = useState(false);

  return (
    <Page>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h3" component="div" gutterBottom>
          Octomize
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setSubmitting(true);
              // todo: simulate submission
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Box component={Form}>
              <FieldArray name="hardware" component={HardwareBuilder} />
            </Box>
          )}
        </Formik>
      </Paper>
    </Page>
  );
};

export default Octomize;
