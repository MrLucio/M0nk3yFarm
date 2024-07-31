import { Card, CardContent, CardHeader } from '@/components/ui/card'
import StatsChart from '../charts/statsChart'

function PieCard() {
    // Render
    return (
        <Card class="w-1/5">
            <CardHeader></CardHeader>
            <CardContent>
                <StatsChart />
            </CardContent>
        </Card>
    )
}

export default PieCard
