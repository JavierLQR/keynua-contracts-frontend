/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from 'sonner'

import {
  documentFormSchema,
  DocumentFormValues,
} from '../schema/contract-schema'

import { handleFileUpload } from '@/common/utils/files/handle-file-upload'
import { contractInitialValues } from '../data/contract-initial-values'

import { SectionDocumentData } from './contract-section-document-data'
import { SectionUploadFiles } from './contract-section-upload-files'

import { ReminderAlertsSection } from './contract-reminder-alerts'
import { SignatureProcessSelector } from './contract-signature-process'

import { LoaderIcon } from 'lucide-react'
import { useMutationCreateContract } from '../services/contract-mutation'
import { useContractState } from '../states/contract-form.states'
import { prepareContractPayload } from '../utils/prepare-contract-payload'
import ContractFirmantes from './contract-firmantes'

export const ContractFormMain = () => {
  const router = useRouter()
  const { mutate, isPending } = useMutationCreateContract()

  const {
    setSignatureProcess,
    setUploadedFiles,
    signatureProcess,
    uploadedFiles,
  } = useContractState()

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: contractInitialValues,
  })

  const expirationTime = useWatch({
    control: form.control,
    name: 'expirationInHours',
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const base64Files = await handleFileUpload(e.target.files, { maxMB: 4.5 })
    if (base64Files.length === 0) return

    const merged = [...uploadedFiles, ...base64Files]
    const uniqueFiles = merged.filter(
      (file, index, self) =>
        index ===
        self.findIndex((f) => f.name === file.name && f.size === file.size)
    )

    setUploadedFiles(uniqueFiles)
    form.setValue('documents', uniqueFiles)
    form.trigger('documents')
    e.target.value = ''
  }

  const removeFile = (index: number) => {
    const updated = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(updated)
    form.setValue('documents', updated)
    form.trigger('documents')
  }

  const onSubmit = (data: DocumentFormValues) => {
    const payload = prepareContractPayload(data)
    console.log({
      payload,
    })

    mutate(payload, {
      onSuccess: (response) => {
        const contractId = response.data?.id
        if (contractId) {
          router.push(`/contract/${contractId}`)
        }
        form.reset()
        setUploadedFiles([])
      },
    })
  }

  return (
    <main className="mx-auto max-w-3xl space-y-10 py-10 px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <SectionDocumentData form={form} expirationTime={expirationTime} />

          <SectionUploadFiles
            form={form}
            uploadedFiles={uploadedFiles}
            onFileChange={handleFileChange}
            onRemoveFile={removeFile}
          />

          <SignatureProcessSelector
            value={signatureProcess}
            onChange={setSignatureProcess}
          />

          <ReminderAlertsSection form={form} />

          <ContractFirmantes form={form} />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => {
                form.reset()
                setUploadedFiles([])
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {isPending ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                'Crear Contrato'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
