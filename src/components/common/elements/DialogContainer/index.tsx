/* eslint-disable array-callback-return */
import { Camera, CameraResultType } from '@capacitor/camera'
import { Dialog, Transition } from '@headlessui/react'
import { Button, ColorPicker, Divider, Slider, Stack, Text, TextInput } from '@mantine/core'
import type { FC } from 'react'
import React, { Fragment } from 'react'
import type { HeaderItemType, HeaderType } from 'src/types/schemas'

type DialogTypes = {
  isOpen: boolean
  closeModal: () => void
  componentState: HeaderType
  handleComponentStateChange: (state: HeaderType) => void
}

const DialogBox: FC<DialogTypes> = ({
  isOpen,
  closeModal,
  componentState,
  handleComponentStateChange
}) => {
  function handleChange(key: 'field' | 'fontSize' | 'color' | 'avatar', value: any, index: number) {
    const state = [...componentState]
    const itemToUpdate = state[index]
    if (key === 'field') {
      // @ts-ignore
      itemToUpdate[key].value = value
    } else {
      itemToUpdate[key] = value as never
    }

    handleComponentStateChange(state)
  }
  const takePicture = async (index: number) => {
    const permission = await Camera.checkPermissions()
    if (!permission) {
      Camera.requestPermissions()
    }
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    })
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    const imageUrl = image.webPath

    // Can be set to the src of an image now
    handleChange('avatar', imageUrl, index)
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[90%] max-w-md overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className=" text-lg font-medium text-gray-900">
                  Payment successful
                </Dialog.Title>

                {componentState.map((element: HeaderItemType, stateIndex: number) => {
                  return Object.keys(element).map((item) => {
                    const el = item as 'field' | 'fontSize' | 'color'
                    const value = element[el] as string
                    if (item === 'field' && element.field) {
                      return (
                        <Stack spacing="xs" mt="lg">
                          <Text>Font Size</Text>
                          <TextInput
                            styles={() => ({
                              root: {},
                              input: {
                                color: element.color,
                                fontSize: element.fontSize,
                                textTransform: 'uppercase'
                              }
                            })}
                            variant="unstyled"
                            size="md"
                            value={element!.field.value}
                            onChange={(e) => handleChange(item, e.target.value, stateIndex)}
                            name={item}
                          />
                          <Divider />
                        </Stack>
                      )
                    }
                    if (item === 'fontSize') {
                      const val = Number(value)
                      return (
                        <Stack spacing="xs" mt="lg">
                          <Text>Font Size</Text>
                          <Slider
                            value={val}
                            onChange={(targetVal) => handleChange(item, targetVal, stateIndex)}
                            min={4}
                            max={44}
                          />
                          <Divider />
                        </Stack>
                      )
                    }
                    if (item === 'color') {
                      return (
                        <Stack spacing="xs">
                          <Text>Text Color</Text>
                          <ColorPicker
                            value={value}
                            onChange={(targetVal) => handleChange(item, targetVal, stateIndex)}
                          />
                          <Divider />
                        </Stack>
                      )
                    }
                    if (item === 'avatar') {
                      return (
                        <Stack spacing="xs">
                          <Text>Text Avatar</Text>
                          <Button onClick={() => takePicture(stateIndex)}>Pick Image</Button>
                          <img src={value} />
                          <Divider />
                        </Stack>
                      )
                    }

                    return <Divider />
                  })
                })}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DialogBox
