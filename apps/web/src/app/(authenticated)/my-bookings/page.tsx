'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Button, Modal, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { confirm } = Modal
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function BookingHistoryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [bookings, setBookings] = useState<Model.Booking[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (userId) {
      Api.Booking.findManyByUserId(userId, { includes: ['accommodation'] })
        .then(setBookings)
        .catch(() =>
          enqueueSnackbar('Failed to load bookings', { variant: 'error' }),
        )
        .finally(() => setLoading(false))
    }
  }, [userId])

  const handleCancelBooking = (bookingId: string) => {
    confirm({
      title: 'Are you sure you want to cancel this booking?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        Api.Booking.deleteOne(bookingId)
          .then(() => {
            setBookings(bookings.filter(booking => booking.id !== bookingId))
            enqueueSnackbar('Booking cancelled successfully', {
              variant: 'success',
            })
          })
          .catch(() =>
            enqueueSnackbar('Failed to cancel booking', { variant: 'error' }),
          )
      },
    })
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2} style={{ textAlign: 'center' }}>
        My Booking History
      </Title>
      <Text
        style={{ textAlign: 'center', display: 'block', marginBottom: '20px' }}
      >
        Here you can view your past reservations and cancel them if needed.
      </Text>
      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: 'auto' }} />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={bookings}
          renderItem={booking => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  danger
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  Cancel Booking
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={booking.accommodation?.title}
                description={`From ${dayjs(booking.startDate).format('MMMM D, YYYY')} to ${dayjs(booking.endDate).format('MMMM D, YYYY')}`}
              />
            </List.Item>
          )}
        />
      )}
    </PageLayout>
  )
}
