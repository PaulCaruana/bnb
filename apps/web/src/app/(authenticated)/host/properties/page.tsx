'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Form,
  Input,
  Button,
  DatePicker,
  List,
  Card,
  Space,
  Popconfirm,
  message,
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  DollarOutlined,
  CommentOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HostPropertyManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [accommodations, setAccommodations] = useState<Model.Accommodation[]>(
    [],
  )
  const [bookings, setBookings] = useState<Model.Booking[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: ['accommodationsAsHost', 'accommodationsAsHost.bookings'],
      })
        .then(user => {
          setAccommodations(user.accommodationsAsHost || [])
        })
        .catch(error => {
          enqueueSnackbar('Failed to fetch accommodations', {
            variant: 'error',
          })
        })
    }
  }, [userId])

  const handleUpdateAccommodation = (
    values: Partial<Model.Accommodation>,
    accommodationId: string,
  ) => {
    Api.Accommodation.updateOne(accommodationId, values)
      .then(updatedAccommodation => {
        setAccommodations(prev =>
          prev.map(acc =>
            acc.id === accommodationId ? updatedAccommodation : acc,
          ),
        )
        enqueueSnackbar('Accommodation updated successfully', {
          variant: 'success',
        })
      })
      .catch(error => {
        enqueueSnackbar('Failed to update accommodation', { variant: 'error' })
      })
  }

  const handleDeleteAccommodation = (accommodationId: string) => {
    Api.Accommodation.deleteOne(accommodationId)
      .then(() => {
        setAccommodations(prev =>
          prev.filter(acc => acc.id !== accommodationId),
        )
        enqueueSnackbar('Accommodation deleted successfully', {
          variant: 'success',
        })
      })
      .catch(error => {
        enqueueSnackbar('Failed to delete accommodation', { variant: 'error' })
      })
  }

  const handleCancelBooking = (bookingId: string) => {
    Api.Booking.deleteOne(bookingId)
      .then(() => {
        setBookings(prev => prev.filter(booking => booking.id !== bookingId))
        enqueueSnackbar('Booking cancelled successfully', {
          variant: 'success',
        })
      })
      .catch(error => {
        enqueueSnackbar('Failed to cancel booking', { variant: 'error' })
      })
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Manage Your Properties</Title>
      <Paragraph>
        As a host, you can manage your property listings, availability,
        bookings, and reviews here.
      </Paragraph>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={accommodations}
        renderItem={accommodation => (
          <List.Item>
            <Card
              title={accommodation.title}
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => form.setFieldsValue(accommodation)}
                />,
                <Popconfirm
                  title="Are you sure to delete this accommodation?"
                  onConfirm={() => handleDeleteAccommodation(accommodation.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key="delete" />
                </Popconfirm>,
              ]}
            >
              <Paragraph>{accommodation.description}</Paragraph>
              <Space direction="vertical">
                <Button
                  icon={<CalendarOutlined />}
                  onClick={() =>
                    router.push(
                      `/host/properties/${accommodation.id}/availability`,
                    )
                  }
                >
                  Manage Availability
                </Button>
                <Button
                  icon={<DollarOutlined />}
                  onClick={() =>
                    router.push(`/host/properties/${accommodation.id}/payments`)
                  }
                >
                  View Payments
                </Button>
                <Button
                  icon={<CommentOutlined />}
                  onClick={() =>
                    router.push(`/host/properties/${accommodation.id}/reviews`)
                  }
                >
                  Respond to Reviews
                </Button>
              </Space>
            </Card>
          </List.Item>
        )}
      />

      <Title level={3}>Update Accommodation</Title>
      <Form
        form={form}
        onFinish={values =>
          handleUpdateAccommodation(values, form.getFieldValue('id'))
        }
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please input the type!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>

      <Title level={3}>Bookings</Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={bookings}
        renderItem={booking => (
          <List.Item>
            <Card
              title={`Booking from ${dayjs(booking.startDate).format('YYYY-MM-DD')} to ${dayjs(booking.endDate).format('YYYY-MM-DD')}`}
              actions={[
                <Popconfirm
                  title="Are you sure to cancel this booking?"
                  onConfirm={() => handleCancelBooking(booking.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key="delete" />
                </Popconfirm>,
              ]}
            >
              <Paragraph>Status: {booking.status}</Paragraph>
              <Paragraph>Payment Status: {booking.paymentStatus}</Paragraph>
            </Card>
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
