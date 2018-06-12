@component('components.table-list', [ 'title' => 'View stakeholders' ])
    @slot('columnHeadings')
        <th>First name</th>
        <th>Middle name</th>
        <th>Last name</th>
        <th>Username</th>
        <th>For student</th>
        <th>Last login</th>
    @endslot

    @forelse ($stakeholders as $stakeholder)
        <tr>
            <td>{{ $stakeholder->first_name }}</td>
            <td>{{ $stakeholder->middle_name }}</td>
            <td>{{ $stakeholder->last_name }}</td>
            <td>{{ $stakeholder->username }}</td>
            <td>{{ $stakeholder->student->full_name }}</td>
            <td>{{ $stakeholder->last_login ? $stakeholder->last_login->toFormattedDateString() : 'Never'}}</td>
        </tr>
    @empty
        <tr>
            <td colspan="6" class="warning text-center">No users found</td>
        </tr>
    @endforelse
@endcomponent
