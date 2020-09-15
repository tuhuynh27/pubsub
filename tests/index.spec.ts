import usePubsub from '../src/index'

const eventBus = usePubsub()

let data1: string = ''
let data2: string = ''
let data3: number = 0

function main() {
    let count = 0
    setInterval(() => {
        eventBus.publish('hello', 'world', 'here', count)
        count += 1
    }, 1000)
}

function test() {
    const unsubscribe = eventBus.subscribe('hello', (d1: string, d2: string, d3: number) => {
        data1 = d1
        data2 = d2
        data3 = d3
    })

    setTimeout(() => {
        unsubscribe()
    }, 3000)
}

jest.useFakeTimers('modern')

it('pubSub', () => {
    main()
    test()

    jest.advanceTimersByTime(1100)
    expect(data1).toBe('world')
    expect(data2).toBe('here')
    expect(data3).toBe(0)

    jest.advanceTimersByTime(1100)
    expect(data1).toBe('world')
    expect(data2).toBe('here')
    expect(data3).toBe(1)

    jest.advanceTimersByTime(1100)
    expect(data1).toBe('world')
    expect(data2).toBe('here')
    expect(data3).toBe(2)

    jest.advanceTimersByTime(1100)
    expect(data1).toBe('world')
    expect(data2).toBe('here')
    expect(data3).toBe(2)
})
