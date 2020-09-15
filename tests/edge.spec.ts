import usePubsub from '../src/index'

const eventBus = usePubsub()

const test1Obj = {
    data1: '',
    data2: 0
}

const test2Obj = {
    data1: '',
    data2: 0,
    data3: 0
}

function main() {
    let count = 0
    setInterval(() => {
        eventBus.publish('hello', 'world', count, count)
        count += 1
    }, 1000)
}

function test() {
    const unsubscribeTest1 = eventBus.subscribe('hello', (d1: string, d2: number) => {
        test1Obj.data1 = d1
        test1Obj.data2 = d2
    })

    eventBus.subscribe('hello', (d1: string, d2: number, d3: number) => {
        test2Obj.data1 = d1
        test2Obj.data2 = d2
        test2Obj.data3 = d3
    })

    setTimeout(() => {
        unsubscribeTest1()
    }, 3000)
}

jest.useFakeTimers('modern')

it('pubSub', () => {
    main()
    test()

    jest.advanceTimersByTime(1100)
    expect(test1Obj.data1).toBe('world')
    expect(test1Obj.data2).toBe(0)

    jest.advanceTimersByTime(1100)
    expect(test1Obj.data1).toBe('world')
    expect(test1Obj.data2).toBe(1)

    jest.advanceTimersByTime(1100)
    expect(test1Obj.data1).toBe('world')
    expect(test1Obj.data2).toBe(2)

    jest.advanceTimersByTime(1100)

    // Unsubscribed test1Obj => still 2
    expect(test1Obj.data1).toBe('world')
    expect(test1Obj.data2).toBe(2)

    // test2Obj is not unsubscribed => 3
    expect(test2Obj.data1).toBe('world')
    expect(test2Obj.data2).toBe(3)
    expect(test2Obj.data3).toBe(3)
})
