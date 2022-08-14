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
            <Table sx={{ mx: -2, width: 'auto' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '30%', color: '#0180FF' }}>PROVIDER</TableCell>
                  <TableCell sx={{ width: '30%' }}>INSTANCE</TableCell>
                  <TableCell>VCPU</TableCell>
                  <TableCell>MEMORY (GIB)</TableCell>
                  <TableCell sx={{ width: '40px' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.map((value, ix) => {
                  const { provider, instance, cpu, memory } = value;

                  // formik array helpers + material is significant work to compose.
                  // I'm opting not to use formik Field components here at the cost of auto-wiring state
                  // const errors = form.errors.hardware ? (form.errors.hardware as any)[ix] : {};
                  // const touched = form.touched.hardware ? (form.touched.hardware as any)[ix] : {};
                  // console.log(errors, touched);

                  return (
                    <TableRow key={ix}>
                      <TableCell>
                        <ProviderSelect
                          value={provider}
                          // error={touched?.provider && Boolean(errors?.provider)}
                          // onBlur={() => form.setFieldTouched(`${name}.${ix}.provider`, true)}
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
                          // error={touched?.instance && Boolean(errors?.instance)}
                          // onBlur={() => form.setFieldTouched(`${name}.${ix}.instance`, true)}
                          onChange={(event: React.SyntheticEvent, instance: Instance) => {
                            replace(ix, { ...instance, provider });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <ReadOnlyField value={cpu} disabled={!cpu} />
                      </TableCell>
                      <TableCell>
                        <ReadOnlyField value={memory} disabled={!memory} />
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
      }}
    />
  );
};

export default HardwareBuilder;
