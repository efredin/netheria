import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Field } from 'formik';
import React, { Fragment, useState } from 'react';
import { OptionalFieldGroup } from '../../layout';
import { Engine } from '../schema';

const BenchmarkBuilder = () => {
  const [enabled, setEnabled] = useState(true);
  const [expanded, setExpanded] = useState(false);

  // allow expand/collapse without toggling, but auto toggle when enabled changes
  const handleEnabledChange = (event: React.SyntheticEvent, value: boolean) => {
    setEnabled(value);
    setExpanded(value);
  };

  const handleExpandedChange = (event: React.SyntheticEvent, value: boolean) => {
    setExpanded(value);
  };

  return (
    <OptionalFieldGroup
      label={
        <Fragment>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Benchmark</Typography>
          <Typography variant="body2">Benchmark your model description.</Typography>
        </Fragment>
      }
      enabled={enabled}
      onEnabledChange={handleEnabledChange}
      expanded={expanded}
      onExpandedChange={handleExpandedChange}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Field name="benchmark.engine">
            {({ field, meta }) => (
              <FormControl
                fullWidth
                error={meta.touched && (Boolean(meta.error))}
              >
                <InputLabel id="benchmark-engine">Engine</InputLabel>
                <Select {...field} label="Engine" labelId="benchmark-engine" size="small">
                  {Object.values(Engine).map(engine => (
                    <MenuItem key={engine} value={engine}>{engine}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Field>
        </Grid>
        <Grid item xs={2}>
          <Field name="benchmark.num_trials">
            {({ field, meta }) => (
              <TextField
                fullWidth
                label="Trials"
                type="number"
                size="small"
                error={meta.touched && (Boolean(meta.error))}
                {...field}
              />
            )}
          </Field>
        </Grid>
        <Grid item xs={2}>
          <Field name="benchmark.runs_per_trial">
            {({ field, meta }) => (
              <TextField
                fullWidth
                label="Runs per Trial"
                type="number"
                size="small"
                error={meta.touched && (Boolean(meta.error))}
                {...field}
              />
            )}
          </Field>
        </Grid>
      </Grid>
        
    </OptionalFieldGroup>
  );
};

export default BenchmarkBuilder