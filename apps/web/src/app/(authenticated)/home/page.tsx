'use client'

import { useEffect, useState } from 'react'
import { Typography, Select, List, Card, Row, Col } from 'antd'
import {
  HomeOutlined,
  ApartmentOutlined,
  UserOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [accommodations, setAccommodations] = useState<Model.Accommodation[]>(
    [],
  )
  const [filterType, setFilterType] = useState<string>('')

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const queryOptions = filterType ? { filters: { type: filterType } } : {}
        const accommodationsFound =
          await Api.Accommodation.findMany(queryOptions)
        setAccommodations(accommodationsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch accommodations', { variant: 'error' })
      }
    }

    fetchAccommodations()
  }, [filterType])

  const handleFilterChange = (value: string) => {
    setFilterType(value)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Available Accommodations</Title>
      <Paragraph>
        Browse through different accommodation options and filter by type to
        find what suits you best.
      </Paragraph>
      <Select
        placeholder="Filter by type"
        onChange={handleFilterChange}
        style={{ width: 200, marginBottom: 20 }}
      >
        <Option value="">All</Option>
        <Option value="apartment">Apartment</Option>
        <Option value="house">House</Option>
        <Option value="room">Room</Option>
      </Select>
      <Row gutter={[16, 16]}>
        {accommodations?.map(accommodation => (
          <Col xs={24} sm={12} md={8} lg={6} key={accommodation.id}>
            <Card
              title={accommodation.title}
              bordered={false}
              hoverable
              onClick={() => router.push(`/accommodations/${accommodation.id}`)}
              cover={
                <img
                  alt={accommodation.title}
                  src={
                    accommodation.host?.pictureUrl ||
                    'https://via.placeholder.com/150'
                  }
                />
              }
            >
              <Card.Meta
                avatar={<UserOutlined />}
                title={accommodation.type}
                description={accommodation.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
