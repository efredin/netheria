import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useProviders } from '..';

export interface ProviderSelectProps {
  value: string | null;
  error?: boolean;
  onBlur?: (event: React.SyntheticEvent) => void;
  onChange: (event: React.SyntheticEvent, value: string | null) => void;
}

const ProviderSelect = ({ error, onBlur, ...props }: ProviderSelectProps) => {
  const { data, isLoading } = useProviders();

  const providers = data || [];

  return (
    <Autocomplete
      {...props}
      loading={isLoading}
      options={providers}
      getOptionLabel={option => option}
      onBlur={onBlur}
      renderInput={(params) => <TextField error={error} {...params} placeholder="Select Provider" /> }
    />
  );
};

export default ProviderSelect;