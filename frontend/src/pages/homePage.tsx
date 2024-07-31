import { Component } from 'solid-js'
import { Card, CardHeader } from '@/components/ui/card'
import FlagsCard from '@/components/cards/flagsCard'

const HomePage: Component = () => {
    // Render
    return (
        <>
            <div class="flex p-4 gap-4">
                <Card class="w-1/4">
                    <CardHeader>
                        <h2 class="text-2xl font-bold">Roba a caso</h2>
                    </CardHeader>
                </Card>
                <FlagsCard />
            </div>
        </>
    )
}

export default HomePage
