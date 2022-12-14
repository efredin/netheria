import { Box, Button, Grid, Modal, Paper, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { Fragment, useEffect, useState } from 'React';
import { Page } from '../../layout';
import { Octomize, OctomizeJob, octomizeSchema, useSubmitJob } from '..';
import { Engine } from '../schema';
import { defaultHardware, HardwareBuilder, BenchmarkBuilder, AccelerateBuilder } from '.';
import { Formik, Form } from 'formik';

interface OctomizeFormValues extends Octomize {
  job?: unknown; // allows for custom form level validation
}

const initialValues: OctomizeFormValues = {
  hardware: [{ ...defaultHardware as any }],
  benchmark: {
    engine: Engine.TVM,
    num_trials: 1,
    runs_per_trial: 1
  },
  accelerate: {
    engine: Engine.TVM
  }
};

interface RunItem {
  instance: string;
  cpu: number;
  runs: number;
}

const OctomizePage = () => {
  const [benchmarkEnabled, setBenchmarkEnabled] = useState(true);
  const [accelerateEnabled, setAccelerateEnabled] = useState(true);
  const [job, setJob] = useState<OctomizeJob | null>(null);
  const submitJobMutation = useSubmitJob();

  return (
    <Page>
      <Formik
        initialValues={initialValues}
        validationSchema={octomizeSchema}
        validate={() => {
          const errors: any = {};
          if (!benchmarkEnabled && !accelerateEnabled) {
            errors.job = 'At least one benchmark or accelerate job is required.'
          }
          return errors;
        }}
        onSubmit={async ({ hardware, benchmark, accelerate }, { setSubmitting }) => {
          try {
            // ignore disabled jobs
            const jobConfig: Octomize = {
              hardware,
              benchmark: benchmarkEnabled ? benchmark : undefined,
              accelerate: accelerateEnabled ? accelerate : undefined
            };

            const job = await submitJobMutation.mutateAsync(jobConfig);
            setJob(job);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, values, errors, resetForm, validateForm }) => {
          const { hardware, benchmark, accelerate } = values;
          const [totalRuns, setTotalRuns] = useState(0);
          const [runItems, setRunItems] = useState<RunItem[]>([]);

          const handleJobModalClose = () => {
            setJob(null);
            resetForm();
          };

          useEffect(() => {
            // compute run summary
            let total = 0;
            const items: RunItem[] = [];
            for (const { instance, cpu } of hardware) {
              if (!instance) continue;

              // calculate #runs per hardware instance
              const benchmarkRuns = benchmarkEnabled && benchmark
              ? benchmark.num_trials * benchmark.runs_per_trial
              : 0;
              const accelerateRuns = accelerateEnabled && accelerate ? 1 : 0;
              const runs = benchmarkRuns + accelerateRuns;

              // running total
              total += runs;

              // item details
              items.push({ instance, cpu, runs });
            }
            setTotalRuns(total);
            setRunItems(items);
          }, [values, benchmarkEnabled, accelerateEnabled])

          useEffect(() => {
            // trigger form validation when enabled jobs change
            validateForm();
          }, [benchmarkEnabled, accelerateEnabled]);

          return (
            <Box component={Form}>
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
                    {!isValid && errors.job && <Typography variant="body2" color="error.main">
                      {errors.job}
                    </Typography>}
                    <BenchmarkBuilder
                      enabled={benchmarkEnabled}
                      onEnabledChange={(event, enabled) => setBenchmarkEnabled(enabled)}
                    />
                    <AccelerateBuilder
                      enabled={accelerateEnabled}
                      onEnabledChange={(event, enabled) => setAccelerateEnabled(enabled)}
                    />
                    <HardwareBuilder />
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
                    <Grid container>
                      {runItems.map(({ instance, cpu, runs }, ix) => (
                        <Fragment key={ix}>
                          <Grid item xs={10}>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {instance}
                            </Typography>
                            <Typography variant="caption" component="p" sx={{ fontWeight: 500, color: '#91969C', mb: 2 }}>
                              {cpu} cores
                            </Typography>
                          </Grid>
                          <Grid item xs={2} textAlign="right">
                            <Typography variant="body2"  sx={{ color: '#4DB296' }}>
                              {runs}
                            </Typography>
                          </Grid>
                        </Fragment>
                      ))}
                    </Grid>
                    
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
              <Modal
                open={!!job}
                onClose={handleJobModalClose}
              >
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4
                }}>
                  <Typography variant="h6">
                    Job Running
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Closing this modal will reset the form.  Thanks for checking this out.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleJobModalClose}
                  >
                    Dismiss
                  </Button>
                </Box>
              </Modal>
            </Box>
          );
        }}
      </Formik>
    </Page>
  );
};

export default OctomizePage;
