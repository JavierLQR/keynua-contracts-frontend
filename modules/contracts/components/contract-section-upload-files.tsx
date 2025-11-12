'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Upload, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { SectionUploadFilesProps } from '../types/contract-form-type'
import { Switch } from '@/components/ui/switch'

export const SectionUploadFiles = ({
  form,
  uploadedFiles,
  onFileChange,
  onRemoveFile,
}: SectionUploadFilesProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-semibold text-muted-foreground">
            2.
          </span>
          <div>
            <CardTitle className="text-xl">Subir Documento</CardTitle>
            <CardDescription>Sube los documentos a firmar.</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="documents"
          render={() => (
            <FormItem>
              <FormLabel>Archivos</FormLabel>

              <label
                className={cn(
                  'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors cursor-pointer',
                  'border-border hover:border-muted-foreground/50 hover:bg-muted/50',
                  'p-8 md:p-12'
                )}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="font-medium text-foreground">
                    Arrastra los archivos aquí
                  </p>
                  <p className="text-sm text-muted-foreground">
                    o haz clic para seleccionar
                  </p>
                </div>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  onChange={onFileChange}
                  className="hidden"
                />
              </label>

              <p className="text-xs text-muted-foreground mt-2">
                Solo se aceptan PDF, Word, Excel o PowerPoint (máx. 4.5 MB)
              </p>

              {uploadedFiles.length > 0 && (
                <div className="space-y-3 mt-4">
                  {uploadedFiles.map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-muted p-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveFile(i)}
                        className="ml-3 inline-flex items-center justify-center rounded-md p-1 text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        {/* 🆕 Toggle de firma de Keynua */}
        <div className="rounded-md border bg-muted/30 p-4">
          <FormField
            control={form.control}
            name="pdfData.addSignatureOnAllDocs"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0">
                <div className="flex flex-col">
                  <FormLabel className="text-sm font-medium">
                    Agregar la firma de Keynua a los documentos que se firmarán
                    por separado.
                  </FormLabel>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cuando todos los participantes hayan firmado, se generará un
                    certificado por cada documento y uno adicional con todos los
                    documentos concatenados.
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
