import { Component } from 'solid-js'
import FlagsCard from '@/components/cards/flagsCard'
import PieCard from '@/components/cards/pieCard'

const HomePage: Component = () => {
    // Render
    return (
        <>
            <div class="flex p-4 gap-4">
                <PieCard />
                <FlagsCard />
            </div>
        </>
    )
}

export default HomePage
