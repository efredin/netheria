import { Box, Grid, Paper, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'React';
import { Page } from '../../layout';
import { Octomize, octomizeSchema } from '..';
import { Engine } from '../schema';
import { defaultHardware, HardwareBuilder, BenchmarkBuilder, AccelerateBuilder } from '.';
import { Formik, Form } from 'formik';
import { DeepNullable } from '../../types/Nullable';

const initialValues: DeepNullable<Octomize> = {
  hardware: [{ ...defaultHardware }],
  benchmark: {
    engine: Engine.TVM,
    num_trials: 1,
    runs_per_trial: 1
  },
  accelerate: {
    engine: Engine.TVM
  }
};

const OctomizePage = () => {
  const [totalRuns, setTotalRuns] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  return (
    <Page>
      <Formik
        initialValues={initialValues}
        validationSchema={octomizeSchema}
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
          <Box>
            <Box sx={{ color: '#555B62', my: 6 }}>
              <Typography variant="h2" sx={{ fontSize: 36 }}>
                Shufflenet-v2.onnx
              </Typography>
              <Typography variant="subtitle1">
                Created three days ago by Mike Johnson
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h3" gutterBottom sx={{ color: '#7B818A', fontSize: 30 }}>
                    Octomize
                  </Typography>
                  <Box component={Form}>
                    <BenchmarkBuilder />
                    <AccelerateBuilder />
                    <HardwareBuilder />
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
          </Box>
        )}
      </Formik>
    </Page>
  );
};

export default OctomizePage;
