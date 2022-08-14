import React from 'React';
import { Box, Button, Grid, Table, TableHead, TableRow, TableBody, Typography, TableCell, TextField, styled, TextFieldProps, IconButton } from '@mui/material';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import { Instance, InstanceSelect, ProviderSelect  } from '..';
import { Nullable } from '../../types/Nullable';
import { Close } from '@mui/icons-material';

export const defaultHardware: Nullable<Instance> = {
  provider: null,
  instance: null,
  cpu: 0,
  memory: 0
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

const HardwareBuilder = () => {
  return (
    <FieldArray
      name="hardware"
      render={({ push, replace, remove, form }) => {
        const { errors } = form;
        const values: Instance[] = form.values.hardware;
        return (
          <Box>
            <Grid container spacing={2} sx={{ mt: 8 }}>
              <Grid item xs={10}>
                <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 500, color: '#7B818A' }}>
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
            <Table sx={{ mx: -2, width: 'auto' }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '30%', fontSize: 10, color: '#0180FF' }}>PROVIDER</TableCell>
                  <TableCell sx={{ width: '30%', fontSize: 10, color: '#7B818A' }}>INSTANCE</TableCell>
                  <TableCell sx={{ fontSize: 10, color: '#7B818A' }}>VCPU</TableCell>
                  <TableCell sx={{ fontSize: 10, color: '#7B818A' }}>MEMORY (GIB)</TableCell>
                  <TableCell sx={{ width: '40px' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {/* Spacer / error message row */}
                  <TableCell colSpan={5} sx={{ border: 0, height: 22 }}>
                    {typeof errors.hardware === 'string' ? <Typography variant="body2" color="error.main">
                      {errors.hardware}
                    </Typography> : <>&nbsp;</>}
                  </TableCell>
                </TableRow>
                {values.map((value, ix) => {
                  const { provider, instance, cpu, memory } = value;

                  // formik array helpers atuo wiring giving me grief, so going manual brute force
                  const errors = form.errors.hardware ? (form.errors.hardware as any)[ix] : {};
                  const touched = form.touched.hardware ? (form.touched.hardware as any)[ix] : {};

                  return (
                    <TableRow key={ix}>
                      <TableCell sx={{ border: 0 }}>
                        <ProviderSelect
                          value={provider}
                          size="small"
                          error={touched?.provider && Boolean(errors?.provider)}
                          onBlur={() => form.setFieldTouched(`hardware.${ix}.provider`, true)}
                          onChange={(event: React.SyntheticEvent, provider: string) => {
                            replace(ix, { ...defaultHardware, provider });
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ border: 0 }}>
                        <InstanceSelect
                          value={values[ix]}
                          size="small"
                          provider={provider}
                          disabled={!provider}
                          error={touched?.instance && Boolean(errors?.instance)}
                          onBlur={() => form.setFieldTouched(`hardware.${ix}.instance`, true)}
                          onChange={(event: React.SyntheticEvent, instance: Instance) => {
                            replace(ix, { ...instance, provider });
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ border: 0 }}>
                        <ReadOnlyField value={cpu} disabled={!cpu} size="small" />
                      </TableCell>
                      <TableCell sx={{ border: 0 }}>
                        <ReadOnlyField value={memory} disabled={!memory} size="small" />
                      </TableCell>
                      <TableCell sx={{ border: 0 }}>
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
      }}
    />
  );
};

export default HardwareBuilder;
