'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQueryGetOneContract } from '@/modules/contracts/services/contract-query.service'
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Mail,
  Phone,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ContractDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useQueryGetOneContract(id)

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="animate-spin text-primary h-8 w-8" />
      </div>
    )

  if (error)
    return (
      <div className="text-center text-destructive py-20">
        Ocurrió un error al obtener los datos del contrato.
      </div>
    )

  const contract = data?.data

  if (!contract)
    return (
      <div className="text-center py-20 text-muted-foreground">
        Contrato no encontrado
      </div>
    )

  return (
    <>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="w-full min-h-screen bg-gradient-to-br from-background to-muted/30">
          {/* HEADER */}
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 sm:px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Button asChild variant="ghost" size="sm" className="gap-2">
                <Link href="/contract">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Volver</span>
                </Link>
              </Button>
              <Badge className="bg-primary text-primary-foreground capitalize">
                {contract.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-500">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance text-foreground">
                {contract.title}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl line-clamp-2 sm:line-clamp-none">
                {contract.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Código', value: contract.shortCode },
                { label: 'Referencia', value: contract.reference },
                { label: 'Idioma', value: contract.language?.toUpperCase() },
                { label: 'Zona horaria', value: contract.timezone },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-card border border-border/50 rounded-lg p-3 sm:p-4 hover:border-primary/50 transition-colors"
                >
                  <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    {item.label}
                  </p>
                  <p className="text-sm sm:text-base font-medium text-foreground truncate">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500 delay-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Firmantes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contract.users?.map((user) => (
                  <div
                    key={user.id}
                    className="bg-card border border-border/50 rounded-lg p-4 sm:p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4 gap-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {user.name}
                        </h3>
                      </div>
                      <Badge
                        variant="secondary"
                        className="capitalize whitespace-nowrap"
                      >
                        {user.state}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      {user.email && (
                        <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                          <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="truncate">{user.email}</span>
                        </div>
                      )}
                      {user.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                          <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>+{user.phone}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-border/50 mt-2">
                        <div className="text-xs text-muted-foreground">
                          <strong>Grupos:</strong> {user.groups.join(', ')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <strong>Intentos:</strong> {user.attempts.current}/
                          {user.attempts.max}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500 delay-150">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Documentos
              </h2>
              {contract.documents && contract.documents.length > 0 ? (
                <div className="bg-card rounded-lg border border-border/50 overflow-hidden hover:border-primary/30 transition-colors">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-border/50 hover:bg-transparent">
                          <TableHead className="font-semibold text-foreground">
                            Nombre
                          </TableHead>
                          <TableHead className="font-semibold text-foreground hidden sm:table-cell">
                            Tipo
                          </TableHead>
                          <TableHead className="font-semibold text-foreground hidden md:table-cell text-right">
                            Tamaño
                          </TableHead>
                          <TableHead className="font-semibold text-foreground text-right">
                            Acción
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contract.documents.map((doc) => (
                          <TableRow
                            key={doc.id}
                            className="border-b border-border/30 hover:bg-muted/50 transition-colors"
                          >
                            <TableCell className="font-medium text-foreground text-sm sm:text-base">
                              {doc.name}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm hidden sm:table-cell">
                              {doc.type}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm hidden md:table-cell text-right">
                              {(doc.size / 1024).toFixed(1)} KB
                            </TableCell>
                            <TableCell className="text-right">
                              <a
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors text-sm sm:text-base"
                              >
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                  Descargar
                                </span>
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-lg border border-border/50 p-8 text-center">
                  <p className="text-muted-foreground">
                    No hay documentos disponibles
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500 delay-200 pb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                Etapas del proceso
              </h2>
              {contract.items && contract.items.length > 0 ? (
                <div className="bg-card rounded-lg border border-border/50 overflow-hidden hover:border-primary/30 transition-colors">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-border/50 hover:bg-transparent">
                          <TableHead className="font-semibold text-foreground w-12">
                            #
                          </TableHead>
                          <TableHead className="font-semibold text-foreground">
                            Etapa
                          </TableHead>
                          <TableHead className="font-semibold text-foreground hidden sm:table-cell">
                            Tipo
                          </TableHead>
                          <TableHead className="font-semibold text-foreground text-right">
                            Estado
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contract.items.map((item, idx) => (
                          <TableRow
                            key={item.id}
                            className="border-b border-border/30 hover:bg-muted/50 transition-colors"
                          >
                            <TableCell className="font-bold text-primary text-sm sm:text-base">
                              {idx + 1}
                            </TableCell>
                            <TableCell className="font-medium text-foreground text-sm sm:text-base">
                              {item.title}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm hidden sm:table-cell">
                              {item.type}
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge
                                variant="outline"
                                className="capitalize border-primary/20 text-primary text-xs sm:text-sm"
                              >
                                {item.state}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-lg border border-border/50 p-8 text-center">
                  <p className="text-muted-foreground">
                    No hay etapas registradas
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}
