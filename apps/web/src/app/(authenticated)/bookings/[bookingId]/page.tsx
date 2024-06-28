'use client'

import { useEffect, useState } from 'react'
import { Typography, Button, List, Card, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function BookingPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [bookings, setBookings] = useState<Model.Booking[]>([])

  useEffect(() => {
    if (userId) {
      Api.Booking.findManyByUserId(userId, { includes: ['accommodation'] })
        .then(setBookings)
        .catch(() =>
          enqueueSnackbar('Failed to fetch bookings', { variant: 'error' }),
        )
    }
  }, [userId])

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await Api.Booking.deleteOne(bookingId)
      setBookings(bookings.filter(booking => booking.id !== bookingId))
      enqueueSnackbar('Booking canceled successfully', { variant: 'success' })

      // Create a cancellation notification
      await Api.Notification.createOneByUserId(userId!, {
        title: 'Booking Canceled',
        message: `Your booking has been canceled successfully.`,
      })
    } catch (error) {
      enqueueSnackbar('Failed to cancel booking', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>My Bookings</Title>
      <Text>Here you can view and manage your bookings.</Text>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={bookings}
        renderItem={booking => (
          <List.Item>
            <Card
              title={booking.accommodation?.title}
              extra={
                <Button
                  type="primary"
                  danger
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  Cancel
                </Button>
              }
            >
              <Space direction="vertical">
                <Text>
                  <CheckCircleOutlined /> Start Date:{' '}
                  {dayjs(booking.startDate).format('YYYY-MM-DD')}
                </Text>
                <Text>
                  <CheckCircleOutlined /> End Date:{' '}
                  {dayjs(booking.endDate).format('YYYY-MM-DD')}
                </Text>
                <Text>
                  <CheckCircleOutlined /> Status: {booking.status}
                </Text>
                <Text>
                  <CheckCircleOutlined /> Payment Status:{' '}
                  {booking.paymentStatus}
                </Text>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
