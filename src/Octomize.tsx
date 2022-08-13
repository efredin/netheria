import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'React';
import { Page } from './layout';
import { Instance, octomizeSchema } from './schema';
import { HardwareBuilder } from './hardware';
import { Formik, Form, FieldArray } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

interface OctomizePayload {
  hardware: Instance[];
}

const initialValues: OctomizePayload = {
  hardware: []
};

const validationSchema = toFormikValidationSchema(octomizeSchema)

const Octomize = () => {
  const [submitting, setSubmitting] = useState(false);

  return (
    <Page>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
          <Grid container>
            <Grid item xs={9}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h3" component="div" gutterBottom>
                  Octomize
                </Typography>
                <Box component={Form}>
                  <FieldArray name="hardware" component={HardwareBuilder} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        )}
      </Formik>
    </Page>
  );
};

export default Octomize;
