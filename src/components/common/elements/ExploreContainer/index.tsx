import { IonAvatar } from '@ionic/react'
import { ActionIcon, Box, Flex, Grid, Group, Stack, Text } from '@mantine/core'
import { IconSettings } from '@tabler/icons'
import React, { useMemo } from 'react'
import { DialogContainer } from 'src/components/common'
import { useWindowDimensions } from 'src/hooks'
import type { HeaderType } from 'src/types/schemas'

const ExploreContainer: React.FC<{ name: string }> = () => {
  const { width } = useWindowDimensions()
  const [isOpen, setIsOpen] = React.useState(false)
  const [header, setHeader] = React.useState<HeaderType>([
    {
      field: {
        name: 'name',
        value: 'Shakti man'
      },
      fontSize: 28,
      color: '#000000'
    },
    {
      field: {
        name: 'jobTitle',
        value: 'System Administrator'
      },
      fontSize: 18,
      color: '#000000'
    },
    {
      field: {
        name: 'companyName',
        value: 'Saffron Chariot'
      },
      fontSize: 18,
      color: '#000000'
    },
    {
      avatar: ''
    }
  ])
  const handleChange = (state: HeaderType) => {
    setHeader(state)
  }
  const headerElements: any = useMemo(() => {
    return header.reduce((acc, el) => {
      if (el?.field?.name) {
        // @ts-ignore
        acc[`${el.field.name}`] = el
        return acc
      }
      if (Object.keys(el)[0] === 'avatar') {
        // @ts-ignore
        acc[`${'avatar'}`] = el
        return acc
      }
      return acc
    }, {})
  }, [header])
  return (
    <Box id="box" p="lg" pos="relative" style={{ border: '1px solid #333' }} mt="xl">
      <Flex
        pos="absolute"
        style={{ zIndex: 11, border: '1px solid #ccc' }}
        top={-45}
        left={width / 2 - 50}
        h={35}
        miw={100}
        bg="#ffffff"
        mt="xl"
        justify="center"
        align="center"
        p={'sm'}
      >
        <Group>
          <ActionIcon onClick={() => setIsOpen(true)}>
            <IconSettings size={22} />
          </ActionIcon>
        </Group>
      </Flex>
      <DialogContainer
        handleComponentStateChange={handleChange}
        componentState={header}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
      <Box id="container">
        <Grid>
          <Grid.Col span="auto">
            <Stack spacing="xs">
              <Text
                style={{ fontSize: headerElements.name.fontSize, color: headerElements.name.color }}
                transform="uppercase"
              >
                {headerElements.name.field.value}
              </Text>
              <Text
                style={{
                  fontSize: headerElements.jobTitle.fontSize,
                  color: headerElements.jobTitle.color
                }}
                transform="uppercase"
              >
                {headerElements.jobTitle.field.value}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={4} mt="xs">
            <IonAvatar>
              <img src={headerElements.avatar.avatar} />
            </IonAvatar>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  )
}

export default ExploreContainer
