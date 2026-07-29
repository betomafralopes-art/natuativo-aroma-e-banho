'use client'


interface QuantitySelectorProps {
  quantidade: number
  onChange: (value: number) => void
  min?: number
}

export default function QuantitySelector({
  quantidade,
  onChange,
  min = 1,
}: QuantitySelectorProps) {
  function diminuir() {
    if (quantidade > min) {
      onChange(quantidade - 1)
    }
  }

  function aumentar() {
    onChange(quantidade + 1)
  }

  return (
    <div className="flex items-center justify-center rounded-2xl border border-stone-300 overflow-hidden">

      <button
        type="button"
        onClick={diminuir}
        className="h-12 w-12 text-xl transition hover:bg-stone-100"
      >
        −
      </button>

      <div className="flex-1 text-center font-semibold text-lg">
        {quantidade}
      </div>

      <button
        type="button"
        onClick={aumentar}
        className="h-12 w-12 text-xl transition hover:bg-stone-100"
      >
        +
      </button>

    </div>
  )
}