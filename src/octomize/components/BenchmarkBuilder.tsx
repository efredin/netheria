import { FieldProps } from 'formik';
import React, { useState } from 'react';
import { OptionalFieldGroup } from '../../layout';
// import { Engine } from '../schema';

// export const defaultBenchmark = {
//   engine: Engine.TVM,
//   num_trials: 1,
//   runs_per_trial: 1
// };

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
      label="Benchmark your model"
      enabled={enabled}
      onEnabledChange={handleEnabledChange}
      expanded={expanded}
      onExpandedChange={handleExpandedChange}
    >
      Benchamark form
    </OptionalFieldGroup>
  );
};

export default BenchmarkBuilder