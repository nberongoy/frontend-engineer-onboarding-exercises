import { Box, Image, Text } from '@chakra-ui/react';
import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Upload: FC = () => {
  const onDrop = useCallback(() => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      <Box borderWidth="2px" borderRadius="6px" borderStyle="dashed" height="13em" cursor="pointer" textAlign="center">
        <Image src="/upload_plus.png" mt="50" ml="45%" />
        <Text>
          <span style={{ color: '#6B46C1' }}>Upload a file</span> or drag and drop
        </Text>
        <Text color="gray.500" fontSize="md">
          PNG, JPG, GIF up to 10MB
        </Text>
      </Box>
    </div>
  );
};

export default Upload;
