import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAuth0Wrapper, useGraphQLSWR } from '@coldpbc/hooks';
import { SustainabilityAttributeGraphQL } from '@coldpbc/interfaces';
import { DEFAULT_ICON_URL } from '@coldpbc/components';
import { get } from 'lodash';
import { toSentenceCase } from '@coldpbc/lib';

export const SustainabilityAttributeSelect = () => {
  const { orgId } = useAuth0Wrapper();
  const sustainabilityAttributesQuery = useGraphQLSWR<{
    sustainabilityAttributes: SustainabilityAttributeGraphQL[]
  }>(orgId ? 'GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG' : null, {
    organizationId: orgId,
  });

  // TODO: Loading
  // TODO: Error

  const sustainabilityAttributesGraphQL: SustainabilityAttributeGraphQL[] = get(sustainabilityAttributesQuery.data, 'data.sustainabilityAttributes', []).sort(
    (a, b) => a.name.localeCompare(b.name),
  );

  return (
    <Autocomplete
      id="sustainability-attribute-select"
      sx={{
        width: 300,
        '& .MuiInputBase-root': {
          backgroundColor: 'transparent'
        }
      }}
      options={sustainabilityAttributesGraphQL}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const imageUrl = option.logoUrl || DEFAULT_ICON_URL;

        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {/* Only render image if we have a URL */}
            {imageUrl && (
              <img
                loading="lazy"
                width="48"
                src={imageUrl}
                alt=""
              />
            )}
            <div className="flex flex-col gap-1">
              <span className="text-tc-primary font-bold">{option.name}</span>
              <span className="text-tc-primary">{toSentenceCase(option.level)}</span>
            </div>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a sustainability attribute"
          sx={{
          '& .MuiInputBase-input': {
            background: 'transparent'
          },
          '& .MuiOutlinedInput-root': {
            background: 'transparent',
          }
        }}
        />
      )}
    />
  );
}
