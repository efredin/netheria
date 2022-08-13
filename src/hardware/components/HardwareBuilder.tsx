import React from 'React';
import InstanceSelect from './InstanceSelect';
import ProviderSelect from './ProviderSelect';
import { Box, Button, Grid, Table, TableHead, TableRow, TableBody, Typography, TableCell, TextField, styled, TextFieldProps, IconButton } from '@mui/material';
import { Field, FieldArrayRenderProps } from 'formik';
import { Instance } from '../Instance';
import { Nullable } from '../../types/Nullable';
import { Close } from '@mui/icons-material';

const defaultHardware: Nullable<Instance> = {
  provider: null,
  instance: null,
  cpu: null,
  memory: null
}

const ReadOnlyTextField = styled(TextField)({
  '& fieldset': {
    // wouldn't normally use !important modifier, but fighting with focus & hover styles
    borderColor: 'transparent !important' 
  },
});

const ReadOnlyField = (props: TextFieldProps) => (
  <ReadOnlyTextField 
    {...props}
    InputProps={{
      readOnly: true
    }}
  />
);

const HardwareBuilder = ({ name, push, replace, remove, form }: FieldArrayRenderProps) => {
  const values: Instance[] = form.values.hardware;
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h6" color="gray">
            Hardware targets
          </Typography>
        </Grid>
        <Grid item xs={2} textAlign="right">
          <Button
            variant="contained"
            color="primary"
            onClick={() => push({ ...defaultHardware })}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Provider</TableCell>
            <TableCell>Instance</TableCell>
            <TableCell>VCPU</TableCell>
            <TableCell>Memory (Gib)</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((value, ix) => {
            const { provider, instance, cpu, memory } = values[ix];
            return (
              <TableRow key={ix}>
                <TableCell>
                  <ProviderSelect
                    value={provider}
                    onChange={(event: React.SyntheticEvent, provider: string) => {
                      replace(ix, { ...defaultHardware, provider });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <InstanceSelect
                    value={values[ix]}
                    provider={provider}
                    disabled={!provider}
                    onChange={(event: React.SyntheticEvent, instance: Instance) => {
                      replace(ix, { ...instance, provider });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <ReadOnlyField value={value?.cpu || ''} />
                </TableCell>
                <TableCell>
                  <ReadOnlyField value={value?.memory || ''} />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => remove(ix)}>
                    <Close />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default HardwareBuilder;
