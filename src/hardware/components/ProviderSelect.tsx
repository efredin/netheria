import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useProviders } from '../hooks';

export interface ProviderSelectProps {
  value: string | null;
  onChange: (event: React.SyntheticEvent, value: string | null) => void;
}

const ProviderSelect = (props: ProviderSelectProps) => {
  const { data, isLoading } = useProviders();

  const providers = data || [];

  return (
    <Autocomplete
      {...props}
      loading={isLoading}
      options={providers}
      getOptionLabel={option => option}
      renderInput={(params) => <TextField {...params} placeholder="Select Provider" /> }
    />
  );
};

export default ProviderSelect;