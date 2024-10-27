import React from 'react'

type StatsProps = {
  baseStat: number;
  statName: string;
}
const StatsDetail = ({ baseStat, statName }: StatsProps) => {
  return (
    <div className="flex flex-col items-center justify-center mb-5">
      <div className="bg-blue-50 radial-progress text-secondary" style={{ "--value": baseStat } as React.CSSProperties} role="progressbar">
        {baseStat} %
      </div>
      <p className="mt-2 text-sm text-center text-secondary">{statName}</p>
    </div>
  )
}

export default StatsDetail