import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MonthlyData } from "@/lib/mockData";

interface DealsChartProps {
  data: MonthlyData[];
}

export function DealsChart({ data }: DealsChartProps) {
  return (
    <div className="bg-bg-card rounded-2xl p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
        <span>📈</span> Évolution (6 derniers mois)
      </h3>
      
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2c2c2c" />
          <XAxis 
            dataKey="month" 
            stroke="#929292" 
            style={{ fontSize: '10px' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            stroke="#929292" 
            style={{ fontSize: '10px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#2c2c2c', 
              border: '1px solid #f07b3c',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '12px'
            }}
            labelStyle={{ color: '#f07b3c' }}
          />
          <Line 
            type="monotone" 
            dataKey="deals" 
            stroke="#f07b3c" 
            strokeWidth={3}
            dot={{ fill: '#f07b3c', r: 4 }}
            activeDot={{ r: 6, fill: '#f09f3c' }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-center text-text-muted text-xs md:text-sm">
        Moyenne : <span className="text-primary font-bold">{(data.reduce((acc, curr) => acc + curr.deals, 0) / data.length).toFixed(1)} deals/mois</span>
      </div>
    </div>
  );
}
