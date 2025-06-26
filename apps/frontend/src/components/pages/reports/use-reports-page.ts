import { useState } from 'react'

export function useReportsPage() {
  const [selectedReport, setSelectedReport] = useState('most-consumed-products-and-services')

  function handleSelectChange(selectedReport: string) {
    setSelectedReport(selectedReport)
  }

  return {
    selectedReport,
    handleSelectChange,
  }
}
