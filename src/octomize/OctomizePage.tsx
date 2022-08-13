import { Box, Grid, Paper, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'React';
import { Page } from '../layout';
import { Octomize, octomizeSchema } from './schema';
import { defaultHardware, HardwareBuilder, Instance } from '../hardware';
import { Formik, Form, FieldArray } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { DeepNullable } from '../types/Nullable';

const initialValues: DeepNullable<Octomize> = {
  hardware: [{ ...defaultHardware }]
};

const validationSchema = toFormikValidationSchema(octomizeSchema);

const OctomizePage = () => {
  const [totalRuns, setTotalRuns] = useState(0);
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
        {({ isSubmitting, isValid, dirty }) => (
          <Grid container spacing={2}>
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
              <Paper sx={{ p: 2 }}>
                <Box sx={{ mb: 2, textAlign: 'right' }}>
                  <Typography variant="caption" component="div" sx={{ fontSize: 12, fontWeight: 700, color: '#7B818A' }}>
                    Total Runs
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#4DB296', fontSize: 32, fontWeight: 600 }}>
                    {totalRuns}
                  </Typography>
                </Box>
                
                <LoadingButton
                  fullWidth
                  variant="contained"
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  Octomize
                </LoadingButton>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Formik>
    </Page>
  );
};

export default OctomizePage;