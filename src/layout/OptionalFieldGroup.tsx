import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, styled } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const StyledAccordion = styled(Accordion)(({ theme }) => `
  margin-bottom: ${theme.spacing(2)};
  border-radius: 6px;
  border: 1px solid ${theme.palette.grey[300]};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);

  &:first-of-type {
    border-radius: 6px;
  }

  &:before {
    display: none;
  }
`);

export interface OptionalFieldGroupProps extends React.PropsWithChildren {
  label: React.ReactNode;
  enabled: boolean;
  onEnabledChange: (event: React.SyntheticEvent, enabled: boolean) => void; 
  expanded: boolean;
  onExpandedChange: (event: React.SyntheticEvent, expanded: boolean) => void;
}

const OptionalFieldGroup = (props: OptionalFieldGroupProps) => {
  const { label, enabled, onEnabledChange, expanded, onExpandedChange, children } = props;
  return (
    <StyledAccordion
      expanded={expanded}
      onChange={onExpandedChange}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
      >
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              checked={enabled} 
              onChange={onEnabledChange}
            />
          }
        />
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </StyledAccordion>
  );
}

export default OptionalFieldGroup;
