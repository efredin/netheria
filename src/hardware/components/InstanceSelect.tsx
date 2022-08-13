import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useHardware } from '../hooks';
import { Instance } from '../Instance';

export interface InstanceSelectProps {
  provider?: string;
  value: Instance;
  disabled?: boolean;
  onChange: (event: React.SyntheticEvent, value: Instance | null) => void;
}

const InstanceSelect = (props: InstanceSelectProps) => {
  const { provider, ...renderProps } = props;
  const { data, isLoading } = useHardware(provider);

  const hardware = data || [];

  return (
    <Autocomplete
      {...renderProps}
      loading={isLoading}
      options={hardware}
      getOptionLabel={option => option?.instance || ''}
      isOptionEqualToValue={(option, value) => value.provider === option.provider && value.instance === option.instance}
      renderInput={(params) => <TextField {...params} placeholder="Select Instance" /> }
    />
  );
};

export default InstanceSelect;