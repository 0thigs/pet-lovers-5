import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'

import type { Pet } from '@pet-lovers/core/entities'
import type { PetDto } from '@pet-lovers/core/dtos'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { PetForm } from './pet-form'
import { usePetsTable } from './use-pets-table'

type PetsTableProps = {
  pets: Pet[]
  page: number
  pagesCount: number
  hasActions: boolean
  hasSelection: boolean
  isLoading?: boolean
  selectedPetsIds?: string[]
  onPageChange?: (page: number) => void
  onUpdatePet?: (petDto: PetDto, petsId: string) => void
  onPetsSelectionChange?: (petsIds: string[]) => void
}

export const PetsTable = ({
  pets,
  hasActions,
  hasSelection,
  page,
  pagesCount,
  isLoading,
  selectedPetsIds,
  onPageChange,
  onPetsSelectionChange,
  onUpdatePet,
}: PetsTableProps) => {
  const { handlePageChange, handlePetsSelectionChange, handleUpdatePet } =
    usePetsTable({
      pets,
      onPageChange,
      onPetsSelectionChange,
      onUpdatePet,
    })

    return (
      <Table
        key={pagesCount}
        color='default'
        selectionMode={hasSelection ? 'multiple' : 'none'}
        selectedKeys={selectedPetsIds}
        aria-label="Tabela de pet's"
        onSelectionChange={(selection) => handlePetsSelectionChange(selection)}
        bottomContent={
          pagesCount > 1 && (
            <Pagination
              color='primary'
              total={pagesCount}
              initialPage={page}
              onChange={(page) => handlePageChange(page)}
            />
          )
        }
        className='w-full'
        checkboxesProps={{
          classNames: {
            wrapper: 'after:bg-foreground after:text-background text-background',
          },
        }}
      >
        <TableHeader>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Raça</TableColumn>
          <TableColumn>Gênero</TableColumn>
          <TableColumn>Nome do cliente</TableColumn>
          <TableColumn>CPF do cliente</TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner />}
          emptyContent='Nenhum pet cadastrado'
          items={pets}
        >
          {(pet) => (
            <TableRow key={pet.id}>
              <TableCell>
                <span className='truncate'>{pet.name}</span>
              </TableCell>
              <TableCell>
                <span className='truncate'>{pet.type}</span>
              </TableCell>
              <TableCell>
                <span className='truncate'>{pet.breed}</span>
              </TableCell>
              <TableCell>
                <span className='truncate'>
                  {pet.gender === 'male' ? 'Macho' : 'Fêmea'}
                </span>
              </TableCell>
              <TableCell>
                <span className='truncate'>
                  {pet.customer.name}
                </span>
              </TableCell>
              <TableCell>
                <span className='truncate'>
                  {`${pet.customer.cpf?.slice(0, 3)}.${pet.customer.cpf?.slice(3, 6)}.${pet.customer.cpf?.slice(6, 9)}-${pet.customer.cpf?.slice(9)}`}
                </span>
              </TableCell>
              <TableCell>
                {hasActions && (
                  <div className='relative flex items-center gap-2'>
                    <Dialog
                      title='Atualizar pet'
                      trigger={(openDialog) => (
                        <Tooltip content='Atualizar pet'>
                          <Button
                            size='sm'
                            className='bg-gray-200 text-zinc-800'
                            onClick={openDialog}
                          >
                            <Icon name='edit' size={16} />
                          </Button>
                        </Tooltip>
                      )}
                    >
                      {(closeDialog) => (
                        <PetForm
                          pet={pet}
                          onCancel={closeDialog}
                          onSubmit={async (petDto) => {
                            closeDialog()
                            await handleUpdatePet(petDto, pet.id)
                          }}
                        />
                      )}
                    </Dialog>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
}
