import { Chart, Colors, Legend, Title, Tooltip } from 'chart.js'
import { Pie } from 'solid-chartjs'
import { onMount, useContext } from 'solid-js'
import { FlagsContext } from '../providers/FlagsProvider'
import useTranslation from '@/locale'

function StatsChart() {
    // Hooks
    const { stats } = useContext(FlagsContext)
    const { t } = useTranslation()

    onMount(() => {
        Chart.register(Title, Tooltip, Legend, Colors)
    })

    // Render
    return (
        <Pie
            data={{
                labels: [
                    t('flags.queued'),
                    t('flags.success'),
                    t('flags.failed'),
                ],
                datasets: [
                    {
                        data: [stats().queued, stats().success, stats().failed],
                        backgroundColor: ['#C9CBCF', '#4BC0C0', '#FF6384'],
                        borderColor: ['#A6A8AB', '#359A9A', '#CC5168'],
                        borderWidth: 1,
                    },
                ],
            }}
            options={{
                animation: {
                    duration: 0,
                },
            }}
        />
    )
}

export default StatsChart
